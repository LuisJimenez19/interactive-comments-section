import Comment from "@/models/Comment";
import dbConnect from "./dbConnect";
import User from "@/models/User";

export async function insertData() {
  try {
    await dbConnect();
    /* Verifico que no se haya introducido la información */
    const checkCount = await Comment.countDocuments();
    if (checkCount > 0) {
      return Promise.resolve("Ya se ha ingresado la información");
    }

    const ju = new User({
      name: "juliusomo", // -> currentUser
      url: "/images/avatars/image-juliusomo.webp",
    });
    await ju.save();

    const ar = new User({
      name: "amyrobson",
      url: "/images/avatars/image-amyrobson.webp",
    });
    await ar.save();

    const mb = new User({
      name: "maxblagun",
      url: "/images/avatars/image-maxblagun.webp",
    });
    await mb.save();

    const rm = new User({
      name: "ramsesmiron",
      url: "/images/avatars/image-ramsesmiron.webp",
    });
    await rm.save();

    /* Insertamos los comentarios */

    const comment1 = new Comment({
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createAt: new Date("2023-06-22T03:24:00"),
      score: 12,
      replies: [],
      user: ar._id,
    });
    await comment1.save();

    const reply1 = new Comment({
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      createAt: new Date("2023-07-15T03:24:00"),
      score: 4,
      replyingTo: mb._id,
      user: rm._id,
    });
    await reply1.save();

    const reply2 = new Comment({
      content:
        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      createAt: new Date("2023-07-20T03:24:00"),
      score: 2,
      replyingTo: rm._id,
      user: ju._id,
    });
    await reply2.save();

    const comment2 = new Comment({
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createAt: new Date("2023-07-08T03:24:00"),
      score: 5,
      user: mb._id,
      replies: [reply1._id, reply2._id],
    });
    await comment2.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
