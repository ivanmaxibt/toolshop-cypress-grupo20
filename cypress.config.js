const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://with-bugs.practicesoftwaretesting.com",
    env: {
      apiUrl: "https://api-with-bugs.practicesoftwaretesting.com",
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {},
  },
});
