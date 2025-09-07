// This is a placeholder for Socket.io on Vercel
// Vercel doesn't support persistent WebSocket connections
// You'll need to use a different real-time solution or deploy Socket.io separately

export default function handler(req, res) {
    res.status(200).json({
        message: "Socket.io not supported on Vercel serverless",
        suggestion: "Deploy Socket.io server separately or use Vercel's Edge Runtime"
    });
}

