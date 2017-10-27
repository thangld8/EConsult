var User = require("../models/userModel");
var Post = require("../models/postModel");


module.exports = {
    homePage: function (req, res) {
        res.render("index.ejs");
    },
    getNewsTotal: function (req, res) {
        var resultNewest;
        var resultNewestRelated;
        var resultNews;
        var resultNotice;
        var resultEvent;

        Post.find({}).limit(1).sort({createDate: -1}).exec(function (err, data) {
            if (!err && data) {
                callback1();
                resultNewest = data;
            } else if (err) throw err
        });

        function callback1() {
            Post.find({}).limit(3).sort({createDate: -1}).exec(function (err, data) {
                if (!err && data) {
                    callback2();
                    resultNewestRelated = data;
                } else
                    throw err;
            });
        }

        function callback2() {
            Post.find({type: "news"}).limit(3).sort({createDate: -1}).exec(function (err, data) {
                if (!err && data) {
                    resultNews = data;
                    callback3();
                } else
                    throw err;
            });
        }

        function callback3() {
            Post.find({type: "notice"}).limit(3).sort({createDate: -1}).exec(function (err, data) {
                if (!err && data) {
                    resultNotice = data;
                    callback4();

                } else
                    throw err;
            });
        }

        function callback4() {
            Post.find({type: "event"}).limit(3).sort({createDate: -1}).exec(function (err, data) {
                if (!err && data) {
                    resultEvent = data;
                    callback5();
                } else
                    throw err;
            })
        }

        function callback5() {
            var resultTotal = [resultNewest, resultNewestRelated, resultNews, resultNotice, resultEvent]
            res.json(resultTotal);
        }
    },
    newsPost: function (req, res) {
        Post.find({type: "news"}).sort({createDate: -1}).exec(function (err, data) {
            res.json(data);
        })
    },
    notiPost: function (req, res) {
        Post.find({type: "notice"}).sort({createDate: -1}).exec(function (err, data) {
            res.render("danh-sach-tin-tuc.ejs", {result: data});
        })
    },
    eventPost: function (req, res) {
            Post.find({type: "event"}).sort({createDate: -1}).exec(function (err,data) {
                if(err) res.status(404).send("NotFound");
                res.render("danh-sach-tin-tuc.ejs", {result:data});
            })
            // await res.json(resultNotice);
    },
    aboutUs: function (req, res) {
        res.render("about-us.ejs");
    },
    priceTable: function (req, res) {
        res.setHeader("content-type", "application/pdf");
        res.sendFile(`${__dirname}/econsult_bangigadichthuat.pdf`);
    },
    shareServices: function (req, res) {
        res.render("shareService.ejs");
    },
    shareServicesTrans: function (req, res) {
        res.render("shareService_dichthuat.ejs");
    },
    shareServicesFinaceCor: function (req, res) {
        res.render("shareService_doangnghiep_thuongmai.ejs");
    },
// shareService_honnhan_giadinh.html
    shareServicesFamily: function (req, res) {
        res.render("shareService_honnhan_giadinh.ejs");
    },

    shareServicesFinaceBanking: function (req, res) {
        res.render("shareService_finace_banking.ejs");
    },
    shareServicesTax: function (req, res) {
        res.render("shareService_tax.ejs");
    },
    shareServicesSupport: function (req, res) {
        res.render("shareService_tuvan.ejs");
    },
    course: function (req, res) {
        res.render("khoa-hoc.ejs");
    },
    hireEmp: function (req, res) {
        res.render("tuyen-dung.ejs");
    },
    contactUs: function (req, res) {
        res.render("tuyen-dung.ejs");
    },
    addPost: function (req, res) {
        try {
            var post = new Post({
                embeddedLink: req.body.embeddedLink,
                type: req.body.type,
                subject: req.body.subject,
                title: req.body.title,
                backgroundColor: req.body.backgroundColor,
                content: req.body.content,
                writer: req.body.writer,
                createDate: Date.now()
            });
           
            Post.create(post,function (err, newData) {
                if(!err)
                    res.json(newData);
                else  res.json({
                    message: error,
                });
            })
        } catch (error) {
            res.json({
                message: error,
            });
            console.log(error);
        }
    },
    login: function (req, res) {
        // console.log(`req:${JSON.stringify(req)}`);
            console.log(req.body.aName)
            User.findOne({user_name: req.body.aName, password: req.body.aPass}).exec(function (err, data) {
                if(!data || err){
                    console.log("invalid user or password!");
                    // res.send(500,'showAlert');
                    // alert("failed");
                    res.json({message: "login failed"});
                }
                res.render("index.login.ejs");
                console.log("valid");

            })
            //  console.log(`req:${JSON.stringify(result)}`);
            // res.json(result);


    }

}
