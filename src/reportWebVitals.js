// Measures Google Core Web Vitals (CLS, FID, FCP, LCP, TTFB) in real users' browsers.
// Dynamically imports the 'web-vitals' library and sends each metric to the given callback.
// Useful for tracking and improving real-world performance (e.g., via analytics).
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
