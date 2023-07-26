/* eslint-disable @next/next/no-img-element */

// import dbConnect from "@/libs/dbConnect";
// import { insertData } from "@/libs/dbInsertData";

// import Comment from "@/models/Comment";

// import "./globals.css";

// import CommentsSection from "./components/CommentsSection";
// import Context from "./context/Context";

// /* inserta la información */

// /* trae la información directamente de la base de datos */
// async function getData() {
//   try {
//     /* si no ha insertado la información */
//     // const res = await insertData(); // ingresa la información
//     await dbConnect();
//     console.log("Inciando la petición con mongoose")
//     const data = await Comment.find({ replyingTo: null }); // los que no respuestas
//     console.log(data)
//     return data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// async function HomePage() {
//   const res = await getData();
//   const comments = JSON.parse(JSON.stringify(res)); // pasaro objetos planos
//   return (
//     <div className="app">
//       <Context>
//         <CommentsSection initialComments={comments} />
//       </Context>
//     </div>
//   );
// }

// export default HomePage;

import "./globals.css";
import CommentsSection from "./components/CommentsSection";
import Context from "./context/Context";

function HomePage() {
  return (
    <div className="app">
      <Context>
        <CommentsSection />
      </Context>
    </div>
  );
}

export default HomePage;
