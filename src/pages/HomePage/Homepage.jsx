import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <h1>Welcome to the Contact Book!</h1>
      <p>Your personal contact manager.</p>
    </div>
  );
}
