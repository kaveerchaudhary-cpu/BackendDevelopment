const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog_database")
    .then(() => {
        console.log("MongoDB connected successfully!");
        createPost();
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

async function createPost() {
    const existingPost = await Post.findOne({
        title: "Introduction to Backend Development"
    });

    if (existingPost) {
        console.log("Post already exists.");
        await readPosts(existingPost);
        return;
    }

    const post = await Post.create({
        title: "Introduction to Backend Development",
        content: "This post explains the basics of backend development.",
        author: "Kabir Chaudhary"
    });

    console.log("Post created successfully!");
    console.log("Post ID:", post._id);

    await readPosts(post);
}

async function readPosts(post) {
    const posts = await Post.find();

    console.log("\nAll Posts:");
    posts.forEach((p) => {
        console.log(p.title, "-", p.author);
    });

    await createComment(post);
}

async function createComment(post) {
    const comment = await Comment.create({
        text: "This is a useful backend development post.",
        author: "Kabir Chaudhary",
        postId: post._id
    });

    console.log("\nComment created successfully!");
    console.log("Comment ID:", comment._id);

    mongoose.connection.close();
}