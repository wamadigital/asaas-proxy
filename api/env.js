export default async function handler(req, res) {
  const token = process.env.ASAAS_TOKEN;
  res.status(200).json({
    tokenExists: !!token,
    preview: token ? token.slice(0, 8) + '...' : null,
    env: process.env.VERCEL_ENV,
    workspace: process.env.VERCEL_PROJECT_OWNER_ID || 'unknown'
  });
}
