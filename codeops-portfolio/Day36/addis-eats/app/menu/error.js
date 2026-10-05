"use client";

export default function Error({ error, reset }) {
  return (
    <div className="error-box">
      <h2>Something went wrong in the menu.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
