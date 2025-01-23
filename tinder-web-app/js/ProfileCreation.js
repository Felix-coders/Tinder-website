document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const bio = document.getElementById('bio').value;
    const hobbies = document.getElementById('hobbies').value;
    const ageRange = document.getElementById('age-range').value;
    const distance = document.getElementById('distance').value;
    const photoInput = document.getElementById('photo-upload');

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const photoData = e.target.result;

            const profileData = {
                name: name,
                age: age,
                bio: bio,
                hobbies: hobbies,
                ageRange: ageRange,
                distance: distance,
                photo: photoData,
            };

            localStorage.setItem('userProfile', JSON.stringify(profileData));
            window.location.href = '../public/Matches.html';
        };

        reader.readAsDataURL(photoInput.files[0]);
    } else {
        alert("Please upload at least one photo.");
    }
});
