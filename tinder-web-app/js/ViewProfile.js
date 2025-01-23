const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        if (userProfile) {
            document.getElementById('profile-photo').src = userProfile.photo;
            document.getElementById('profile-name').textContent = userProfile.name;
            document.getElementById('profile-age').textContent = userProfile.age;
            document.getElementById('profile-bio').textContent = userProfile.bio;
            document.getElementById('profile-hobbies').textContent = userProfile.hobbies;
            document.getElementById('profile-age-range').textContent = userProfile.ageRange;
            document.getElementById('profile-distance').textContent = userProfile.distance;
        } else {
            alert("No profile found! Please create your profile first.");
            window.location.href = "../public/Profile-Creation.html";
        }
