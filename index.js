<script>
function updateDate() {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("currentDate").textContent =
      new Date().toLocaleDateString('en-US', options);
}

updateDate();

// Refresh daily at midnight
setInterval(updateDate, 1000 * 60 * 60 * 24);
</script>