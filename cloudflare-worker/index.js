/**
 * Cloudflare Worker for securing portfolio Contact Form.
 * Handles CORS, validates Cloudflare Turnstile token, and routes emails via EmailJS REST API.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // For security in production, replace with your frontend URL (e.g. "https://yourdomain.com")
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight Options Request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, error: "Method Not Allowed" }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
            "Allow": "POST, OPTIONS",
          },
        }
      );
    }

    try {
      // 2. Parse and Validate Request Payload
      const body = await request.json();
      const { name, email, subject, message, turnstileToken } = body;

      if (!name || !email || !message || !turnstileToken) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Missing required fields (name, email, message, and turnstileToken are required)",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // 3. Verify Turnstile Token with Cloudflare Siteverify API
      const clientIp = request.headers.get("CF-Connecting-IP") || "";
      const siteverifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

      // Form URL-encoded parameters for Siteverify API
      const verifyFormData = new URLSearchParams();
      verifyFormData.append("secret", env.TURNSTILE_SECRET_KEY);
      verifyFormData.append("response", turnstileToken);
      verifyFormData.append("remoteip", clientIp);

      const verifyResponse = await fetch(siteverifyUrl, {
        method: "POST",
        body: verifyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Turnstile verification failed. Are you a bot?",
            details: verifyResult["error-codes"],
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // 4. Securely Forward Message to EmailJS REST API
      const emailJsUrl = "https://api.emailjs.com/api/v1.0/email/send";
      const emailJsPayload = {
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_PUBLIC_KEY,
        accessToken: env.EMAILJS_PRIVATE_KEY, // Passed securely from Worker Environment Secrets
        template_params: {
          from_name: name,
          from_email: email,
          reply_to: email,
          subject: subject || `Portfolio Contact from ${name}`,
          message: message,
        },
      };

      const emailJsResponse = await fetch(emailJsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailJsPayload),
      });

      if (!emailJsResponse.ok) {
        const errorText = await emailJsResponse.text();
        return new Response(
          JSON.stringify({
            success: false,
            error: `Email delivery service error: ${errorText || emailJsResponse.statusText}`,
          }),
          {
            status: 502, // Bad Gateway (external service error)
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // 5. Successful Execution Response
      return new Response(
        JSON.stringify({
          success: true,
          message: "Contact message sent successfully!",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Internal Worker Error: ${error.message || "Unknown error"}`,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  },
};
