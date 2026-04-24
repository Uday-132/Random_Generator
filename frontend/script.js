document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const bitLengthSelect = document.getElementById('bit-length');
    const binaryOutput = document.getElementById('binary-output');
    const decimalOutput = document.getElementById('decimal-output');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const errorMessage = document.getElementById('error-message');
    
    // API Configuration
    const API_BASE_URL = 'http://127.0.0.1:5000';
    
    // Tracking historical digits for Chart
    let zeroCount = 0;
    let oneCount = 0;
    
    // Initialize Chart.js
    const ctx = document.getElementById('distribution-chart').getContext('2d');
    
    // Stylish Chart Configuration
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";
    
    const distributionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0', '1'],
            datasets: [{
                label: 'Generated Bits',
                data: [0, 0],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',  // Primary Blue
                    'rgba(139, 92, 246, 0.8)'   // Secondary Purple
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        precision: 0
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8
                }
            },
            animation: {
                duration: 400
            }
        }
    });

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    };

    const countBits = (binaryString) => {
        for(let i=0; i < binaryString.length; i++) {
            if(binaryString[i] === '0') zeroCount++;
            else if(binaryString[i] === '1') oneCount++;
        }
    };

    const updateChart = () => {
        distributionChart.data.datasets[0].data = [zeroCount, oneCount];
        distributionChart.update();
    };

    const generateNumbers = async () => {
        const numBits = bitLengthSelect.value;
        
        // UI Loading state
        generateBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        try {
            // Fetch from Flask backend
            const response = await fetch(`${API_BASE_URL}/generate?n=${numBits}`);
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Update UI
                binaryOutput.textContent = data.result;
                decimalOutput.textContent = data.decimal;
                
                // Add some cool animation effect
                binaryOutput.style.animation = 'none';
                binaryOutput.offsetHeight; /* trigger reflow */
                binaryOutput.style.animation = 'fadeInUp 0.3s ease-out';
                
                decimalOutput.style.animation = 'none';
                decimalOutput.offsetHeight;
                decimalOutput.style.animation = 'fadeInUp 0.3s ease-out';

                // Update distributions
                countBits(data.result);
                updateChart();
            } else {
                throw new Error(data.error || 'Failed to generate numbers');
            }
            
        } catch (error) {
            console.error('Error generating random number:', error);
            showError(`Failed to connect to backend. Is the Flask server running? (${error.message})`);
        } finally {
            // Restore UI state
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    };

    generateBtn.addEventListener('click', generateNumbers);
});
