const secretInput = document.getElementById('secret');
const otpDisplay = document.getElementById('otp');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');

let totp = null;
let intervalId = null;

function updateOtp() {
    if (!totp) return;
    
    otpDisplay.textContent = totp.generate();
    const timeRemaining = 30 - (Math.floor(Date.now() / 1000) % 30);
    timerDisplay.textContent = timeRemaining;
    progressBar.style.width = `${(timeRemaining / 30) * 100}%`;
}

function startGeneration(secret) {
    clearInterval(intervalId);
    
    if (!secret) {
        totp = null;
        otpDisplay.textContent = "------";
        return;
    }
    
    try {
        totp = new OTPAuth.TOTP({
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: secret,
        });
        
        updateOtp();
        intervalId = setInterval(updateOtp, 1000);
    } catch (error) {
        otpDisplay.textContent = "Error";
    }
}

secretInput.addEventListener('input', () => {
    const secret = secretInput.value.replace(/\s/g, '');
    secretInput.value = secret;
    startGeneration(secret);
});
