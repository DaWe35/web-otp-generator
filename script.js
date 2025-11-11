const secretInput = document.getElementById('secret');
const otpDisplay = document.getElementById('otp');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const saveButton = document.getElementById('saveSecret');

let totp = null;
let intervalId = null;

function updateOtp() {
    if (totp) {
        const token = totp.generate();
        otpDisplay.textContent = token;
    }

    const timeRemaining = 30 - (Math.floor(Date.now() / 1000) % 30);
    timerDisplay.textContent = timeRemaining;
    progressBar.style.width = `${(timeRemaining / 30) * 100}%`;
}

function startOtpGeneration(secret) {
    if (intervalId) {
        clearInterval(intervalId);
    }

    try {
        totp = new OTPAuth.TOTP({
            issuer: "ACME",
            label: "AzureDiamond",
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: secret,
        });

        updateOtp();
        intervalId = setInterval(updateOtp, 1000);
    } catch (error) {
        console.error("Error creating TOTP:", error);
        otpDisplay.textContent = "Error";
    }
}


saveButton.addEventListener('click', () => {
    const secret = secretInput.value.replace(/\s/g, '');
    secretInput.value = secret;
    if (secret) {
        localStorage.setItem('otpSecret', secret);
        startOtpGeneration(secret);
    }
});

const savedSecret = localStorage.getItem('otpSecret');
if (savedSecret) {
    secretInput.value = savedSecret;
    startOtpGeneration(savedSecret);
}
