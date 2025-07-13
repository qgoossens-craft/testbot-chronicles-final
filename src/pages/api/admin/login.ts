import type { APIRoute } from 'astro';

export const prerender = false;

const ADMIN_CREDENTIALS = {
  username: 'titus',
  password: 'testbot2024!'
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { username, password } = body;


    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set authentication cookie
      cookies.set('admin_auth', 'authenticated', {
        path: '/',
        maxAge: 86400, // 24 hours
        httpOnly: false, // Allow client-side access for logout
        secure: false, // Set to true in production with HTTPS
        sameSite: 'lax'
      });

      return new Response(JSON.stringify({ success: true, redirect: '/admin' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};