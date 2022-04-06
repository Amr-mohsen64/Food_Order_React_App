import mealsImage from "../../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {

    const showCart = () => {
        props.onShowCart()
    }


    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={showCart}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="meals Img" />
            </div>

        </>
    )
}

export default Header