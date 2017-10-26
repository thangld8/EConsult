import User from "../model/userModel";
import express from "express";
import Post from "../model/postModel";
import fs from "fs";
import pdfreader from "pdfreader";

const app = express();
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs"); // Set the template engine
// homepage
async function homePage(req, res) {
  try {
    await res.render("../index.ejs");
  } catch (error) {
    throw error;
  }
}

async function getNewsTotal(req, res) {
  try {
    // const result = Post.find({}, (err, data) => {
    //   if (err) throw err;
    //   console.log("Log ra cai nay:", data);
    //   // res.render("../tin-tuc-bao-chi.ejs", { myvar: "123" });
    //   res.json(data);
    // });
    const resultNewest = await Post.find({}).limit(1).sort({ createDate: -1 });
    const resultNewestRelated = await Post.find({}).limit(3).sort({ createDate: -1 });
    const resultNews = await Post.find({ type: "news" }).limit(3).sort({ createDate: -1 });
    const resultNotice = await Post.find({ type: "notice" }).limit(3).sort({ createDate: -1 });
    const resultEvent = await Post.find({ type: "event" }).limit(3).sort({ createDate: -1 });
    const resultTotal = {
      resultNewest, resultNewestRelated, resultNews, resultNotice, resultEvent,
    };
    // res.render("../tin-tuc-bao-chi.ejs", { resultTotal });
    res.json(resultTotal);
  } catch (error) {
    throw error;
  }
}
async function newsPost(req, res) {
  try {
    const result = await Post.find({ type: "news" }).sort({ createDate: -1 });
    // res.render("../danh-sach-tin-tuc.ejs", { result });
    res.json(result);
  } catch (error) {
    throw error;
  }
}
async function notiPost(req, res) {
  try {
    const result = await Post.find({ type: "notice" }).sort({ createDate: -1 });
    res.render("../danh-sach-tin-tuc.ejs", { result });
    // res.json(resultNotice);
  } catch (error) {
    throw error;
  }
}
async function eventPost(req, res) {
  try {
    const result = await Post.find({ type: "event" }).sort({ createDate: -1 });
    res.render("../danh-sach-tin-tuc.ejs", { result });
    // await res.json(resultNotice);
  } catch (error) {
    throw error;
  }
}
async function aboutUs(req, res) {
  res.render("../about-us.ejs");
}
async function priceTable(req, res) {
  res.setHeader("content-type", "application/pdf");
  res.sendFile(`${__dirname}/econsult_bangigadichthuat.pdf`);
}
async function shareServices(req, res) {
  res.render("../shareService.ejs");
}
async function shareServicesTrans(req, res) {
  res.render("../shareService_dichthuat.ejs");
}
async function shareServicesFinaceCor(req, res) {
  res.render("../shareService_doangnghiep_thuongmai.ejs");
}
// shareService_honnhan_giadinh.html
async function shareServicesFamily(req, res) {
  res.render("../shareService_honnhan_giadinh.ejs");
}

async function shareServicesFinaceBanking(req, res) {
  res.render("../shareService_finace_banking.ejs");
}
async function shareServicesTax(req, res) {
  res.render("../shareService_tax.ejs");
}
async function shareServicesSupport(req, res) {
  res.render("../shareService_tuvan.ejs");
}
async function course(req, res) {
  res.render("../khoa-hoc.ejs");
}
async function hireEmp(req, res) {
  res.render("../tuyen-dung.ejs");
}
async function contactUs(req, res) {
  res.render("../tuyen-dung.ejs");
}
async function addPost(req, res) {
  try {
    const post = {
      embeddedLink: req.body.embeddedLink,
      type: req.body.type,
      subject: req.body.subject,
      title: req.body.title,
      backgroundColor: req.body.backgroundColor,
      content: req.body.content,
      writer: req.body.writer,
      createDate: Date.now(),

    };
    const result = await Post.create(post);
    res.json(result);
  } catch (error) {
    res.json({
      message: error,
    });
    console.log(error);
  }
}
async function login(req, res) {
  // console.log(`req:${JSON.stringify(req)}`);
  try {
    const result = await User.findOne({ user_name: req.body.aName, password: req.body.aPass });
    //  console.log(`req:${JSON.stringify(result)}`);
    // res.json(result);
    if (result == null) {
      // ||((result.password) =! (req.body.aPass))
      console.log("invalid user or password!");
      // res.send(500,'showAlert');
      // alert("failed");
      res.json({ message: "login failed" });
      // return false;
    }
    res.render("../index.login.ejs");
    console.log("valid");

    // res.json(result);
    // return true;
  } catch (error) {
    console.log(error);
  }
}
export { homePage, shareServicesTax, contactUs, hireEmp, course, shareServicesSupport, shareServicesFinaceBanking, shareServicesFamily, shareServicesFinaceCor, login, addPost, newsPost, eventPost, notiPost, getNewsTotal, aboutUs, priceTable, shareServices, shareServicesTrans };
