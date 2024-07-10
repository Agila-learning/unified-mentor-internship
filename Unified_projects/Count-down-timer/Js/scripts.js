document.getElementById('start-button').addEventListener('click', function() {
    const targetDate = document.getElementById('target-date').value;
    if (!targetDate) {
        alert('Please select a date and time.');
        return;
    }
    const countdownDate = new Date(targetDate).getTime();
    const countdownDisplay = document.getElementById('countdown-display');
    const message = document.getElementById('message');
    const alarmSound = document.getElementById('alarm-sound');

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(interval);
            message.textContent = 'Countdown reached!';
            countdownDisplay.style.display = 'none';
            alarmSound.play();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
});
