import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

// const App = () => {
//   const [authenticated, setAuthenticated] = useState(false);

//   const handleSignIn = () => {
//     setAuthenticated(true);
//   };

//   const handleSignOut = () => {
//     setAuthenticated(false);
//   };

//   return (
//     <div>
//       <h1>React App with AWS Integration</h1>
//       <Authentication onSignIn={handleSignIn} onSignOut={handleSignOut} />
//       {authenticated && <DataFetching />}
//     </div>
//   );
// };

// export default App;

export default withAuthenticator(App);
