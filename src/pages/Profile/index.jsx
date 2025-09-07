import React from "react";
import './Profile.module.scss'

function ProfileCard(){
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
    }, []);

    return(
        <div className="profile-card">
            {loading ? (
                <p className="loading">Đang tải...</p>
            ) : user ? (
                <>
                    <h1>{user.name}</h1>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                </>
            ) : (
                <p className="loading">Không tải được dữ liệu</p>
            )}
        </div>
    )
}

export default ProfileCard;