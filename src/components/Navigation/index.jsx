import styles from './Navigation.module.scss';
import {NavLink} from 'react-router-dom'

function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to='/' className={({isActive}) => isActive ? styles.active : ''}> Home </NavLink></li>
                <li><NavLink to='/counter' className={({isActive}) => isActive ? styles.active : ''}>Counter</NavLink></li>
                <li><NavLink to="/todo" className={({ isActive }) => isActive ? styles.active : ''}>Todo</NavLink></li>
                <li><NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : ''}>Profile</NavLink></li>
                <li><NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>Products</NavLink></li>
                <li><NavLink to="/comments" className={({ isActive }) => isActive ? styles.active : ''}>Comments</NavLink></li>
                <li><NavLink to="/weather" className={({ isActive }) => isActive ? styles.active : ''}>Weather</NavLink></li>
                <li><NavLink to="/buttons" className={({ isActive }) => isActive ? styles.active : ''}>Buttons</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation;