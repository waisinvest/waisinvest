(() => {
  const REFRESH_MS = 5 * 60 * 1000;
  const MIN_VISIBILITY_REFRESH_GAP_MS = 30 * 1000;
  let refreshing = false;
  let lastRefreshAt = 0;

  async function refreshWaisData(reason = 'timer') {
    if (refreshing || typeof window.initializeApp !== 'function') return;
    refreshing = true;
    try {
      await window.initializeApp();
      lastRefreshAt = Date.now();
      console.info(`[WAIS] data refreshed automatically (${reason})`);
    } catch (error) {
      console.error('[WAIS] automatic data refresh failed:', error);
    } finally {
      refreshing = false;
    }
  }

  window.addEventListener('load', () => {
    lastRefreshAt = Date.now();
    window.setInterval(() => refreshWaisData('5-minute timer'), REFRESH_MS);
  });

  document.addEventListener('visibilitychange', () => {
    if (
      document.visibilityState === 'visible' &&
      Date.now() - lastRefreshAt >= MIN_VISIBILITY_REFRESH_GAP_MS
    ) {
      refreshWaisData('tab became visible');
    }
  });
})();
