// Cloudflare Pages Edge Worker
// Static site prerendering için

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
