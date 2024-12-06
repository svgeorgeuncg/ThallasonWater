//document.getElementById('login-form').addEventListener('submit', async (event) => {
  //
   // const username = document.getElementById('username').value;
//    const password = document.getElementById('password').value;

  //  try {
    //    const response = await fetch('/api/admin/login', {
   //         method: 'POST',
   //         headers: { 'Content-Type': 'application/json' },
   //         body: JSON.stringify({ username, password }),
  //      });

   //     if (response.ok) {
    //        alert('Login successful! Redirecting to admin dashboard...');
            window.location.href = '/admin-products.html'; // Redirect to admin page
    //    } else {
   //         const result = await response.json();
   //         alert(result.error || 'Login failed. Please try again.');
    //    }
   // } catch (error) {
    //    console.error('Error during login:', error);
       // alert('An unexpected error occurred. Please try again later.');
    //}
//});
