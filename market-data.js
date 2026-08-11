// WAIS market-data loader. The reviewed base snapshot is kept separately so
// WAIS can apply small audited overrides without rewriting the full snapshot.
document.write('<script src="market-data.base.js?v=20260811"></script>');
document.write('<script src="market-data-override.js?v=20260811"></script>');
document.write('<script src="auto-refresh.js?v=20260811"></script>');
