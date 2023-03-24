import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <>
      <h1 className="my-4 text-center text-5xl">Hangman Game</h1>
      <main className="p-4">{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
