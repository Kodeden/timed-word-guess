import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <>
      <h1 className="text-center text-5xl">Hangman Game</h1>
      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
