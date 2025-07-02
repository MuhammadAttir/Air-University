const toggleInput = document.getElementById('darkModeToggle');
const body = document.body;

// On load – apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggleInput.checked = true;
}

// Toggle theme on switch
toggleInput?.addEventListener('change', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Navbar link animation and active state management
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active state based on current page
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Handle click animation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Allow the animation to start before navigation
            // The new page will set the correct active state when it loads
        });
    });
});

// Validation helper
function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  let err = input.nextElementSibling;
  if (!err || !err.classList.contains('input-error')) {
    err = document.createElement('div');
    err.className = 'input-error';
    input.parentNode.insertBefore(err, input.nextSibling);
  }
  err.textContent = message;
}

function clearFieldError(inputId) {
  const input = document.getElementById(inputId);
  const err = input.nextElementSibling;
  if (err && err.classList.contains('input-error')) {
    err.textContent = '';
  }
}

// Helper: validate if input is a positive number only
function isValidNumber(value) {
  return /^[0-9]+(\.[0-9]+)?$/.test(value);
}

// Merit Calculator Logic
const form = document.getElementById('meritForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    const getValue = (id) => document.getElementById(id).value.trim();
    const getNum = (id) => parseFloat(getValue(id));

    const matricObtVal = getValue('matricObt');
    const matricTotalVal = getValue('matricTotal');
    const interObtVal = getValue('interObt');
    const interTotalVal = getValue('interTotal');
    const testMarksVal = getValue('testMarks');

    const matricObt = parseFloat(matricObtVal);
    const matricTotal = parseFloat(matricTotalVal);
    const interObt = parseFloat(interObtVal);
    const interTotal = parseFloat(interTotalVal);
    const testMarks = parseFloat(testMarksVal);

    ['matricObt', 'matricTotal', 'interObt', 'interTotal', 'testMarks'].forEach(clearFieldError);

    // Validate each field
    if (!isValidNumber(matricObtVal)) {
      showFieldError('matricObt', 'Only numbers are allowed');
      valid = false;
    } else if (matricObt > matricTotal) {
      showFieldError('matricObt', 'Obtained marks can’t exceed total');
      valid = false;
    }

    if (!isValidNumber(matricTotalVal)) {
      showFieldError('matricTotal', 'Only numbers are allowed');
      valid = false;
    }

    if (!isValidNumber(interObtVal)) {
      showFieldError('interObt', 'Only numbers are allowed');
      valid = false;
    } else if (interObt > interTotal) {
      showFieldError('interObt', 'Obtained marks can’t exceed total');
      valid = false;
    }

    if (!isValidNumber(interTotalVal)) {
      showFieldError('interTotal', 'Only numbers are allowed');
      valid = false;
    }

    if (!isValidNumber(testMarksVal)) {
      showFieldError('testMarks', 'Only numbers are allowed');
      valid = false;
    } else if (testMarks > 100) {
      showFieldError('testMarks', 'Marks cannot exceed 100');
      valid = false;
    }

    if (!valid) {
      document.getElementById('result').innerText = '';
      return;
    }

    // Calculate merit
    const matricPercent = (matricObt / matricTotal) * 100;
    const interPercent = (interObt / interTotal) * 100;
    const testPercent = testMarks; // Already out of 100
    const aggregate = (matricPercent * 0.15) + (interPercent * 0.35) + (testPercent * 0.50);

    document.getElementById('result').innerText = `Your calculated merit is: ${aggregate.toFixed(2)}%`;
  });
}
