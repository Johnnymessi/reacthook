import '../views/Nav.scss';
import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="topnav">
            {/* <a className="active" href="/">Home</a>
            <a href="/timer">Timer Apps</a>
            <a href="/todo">Todo Apps</a>
            <a href="/secret">Secret</a> */}

            {/* chuyển tab không load */}
            {/* bắt buộc phải có exact để khi trò vào tab nào tab đó sẽ sáng lên */}
            <NavLink activeClassName="active" to="/" exact>Home</NavLink>
            <NavLink to="/timer">Timer Apps</NavLink>
            <NavLink to="/todo">Todo Apps</NavLink>
            <NavLink to="/blog">BLOG</NavLink>
            <NavLink to="/secret">Secret</NavLink>
        </div>
    );
}

export default Nav;