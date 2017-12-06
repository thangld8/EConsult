var User = require("../models/userModel");
var Post = require("../models/postModel");
var nodemailer = require('nodemailer');

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
            var resultTotal = {"resultNewest":resultNewest, "resultNewestRelated":resultNewestRelated,"resultNews": resultNews,"resultNotice": resultNotice,"resultEvent": resultEvent};
            //res.json(resultTotal);
            res.render("tin-tuc-bao-chi.ejs", { resultTotal });
        }
    },
    newestPostToEdit: function (req, res) {
        Post.find({}).limit(10).sort({createDate: -1}).exec(function (err, data) {
            //res.json(data);
            result = data;
            res.render("newestPostToEdit.ejs", { result });
        })
    },
    newsPost: function (req, res) {
        Post.find({type: "news"}).sort({createDate: -1}).exec(function (err, data) {
            //res.json(data);
            result = data;
            res.render("danhSachTinTuc.ejs", { result });
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
        paging(req,res,"hire","newestNewsHire.ejs");
    },
    newestNewsPost: function (req, res) {
        paging(req,res,"news","newestNewsPost.ejs");
    },
    newestNewsNotice: function (req, res) {
        paging(req,res,"notice","newestNewsNotice.ejs");
    },
    newestNewsEvent: function (req, res) {
        paging(req,res,"event","newestNewsEvent.ejs");
    },
    newestNewsService: function (req, res) {
        paging(req,res,"service","newestNewsService.ejs");
    },
    newestNewsCourse: function (req, res) {
        paging(req,res,"course","newestNewsCourse.ejs");
    },
    contactUs: function (req, res) {
        res.render("contact-us.ejs");
    },
    sendContact: function (req, res) {
        if(req.body.mail!=null){
            var strContentEmail;
            strContentEmail = "Name:"+req.body.name +"  |  Email:"+req.body.mail+"  |  Address:"+req.body.address+"  |  Phone:"
            +req.body.phone+"  |  Tittle:"+req.body.tittle+"  |  Message:"+req.body.message;

        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'vn.moonlight2016@gmail.com',
              pass: 'leminhtrang'
            }
          });
          
          var mailOptions = {
            from: 'vn.moonlight2016@gmail.com',
            to: 'econsulthn@gmail.com',
            subject: ' Econsult - Thông tin khách hàng',
            text: strContentEmail
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.render("sendContactResult.ejs");
        }
       // 
    },
    reUp: function (req, res) {
        res.render("index.login.ejs");
    },
    updatePost: function (req, res) {
        if(req.body._id!=null){
            var ebl="";
            if(req.body.embeddedLink.search("<iframe")>=0){
                ebl=req.body.embeddedLink;
            }else if(req.body.embeddedLink.search("<img")>=0){
                ebl=req.body.embeddedLink;
            }else{
                ebl="<img src=\""+req.body.embeddedLink+"\" alt=\"Smiley face\" height=\"100%\" width=\"100%\">";
            }
            console.log(req.body.embeddedLink);

        Post.update({_id:req.body._id},{
            embeddedLink: ebl,
            type: req.body.type,
            subject: req.body.subject,
            title: req.body.title,
            backgroundColor: req.body.backgroundColor,
            content: req.body.content,
            writer: req.body.writer,
            createDate: Date.now()
        }, function(err,data){
            if(err){
                res.json({message:err});
            }
            res.render("upNewPostResult.ejs");
        })    
        // Post.find({_id:req.body.idPost}).sort({createDate: -1}).exec(function (err, data) {
        //  //res.json(data);
        //     result = data;
        //     res.render("editPost.ejs", { result });
        // })
        //res.json(req.body);
    }
    },
    editPost: function (req, res) {
        if(req.body.idPost!=null){
            console.log(req.body.idPost);
        Post.find({_id:req.body.idPost}).sort({createDate: -1}).exec(function (err, data) {
         //res.json(data);
            result = data;
            res.render("editPost.ejs", { result });
        })
    }    
    },
    deletePost: function (req, res) {
        if(req.body.idPost!=null){
            console.log(req.body.idPost);
        Post.remove({id:req.body.idPost}).exec(function (err, data) {
            //res.json(data);
               result = data;
               res.render("editPost.ejs", { result });
           });   
    }    
    },
    course1: function (req, res) {
        res.render("course-01.ejs");
    },
    course2: function (req, res) {
        res.render("course-02.ejs");
    },
    course3: function (req, res) {
        res.render("course-03.ejs");
    },
    course4: function (req, res) {
        res.render("course-04.ejs");
    },
    course5: function (req, res) {
        res.render("course-05.ejs");
    },
    course6: function (req, res) {
        res.render("course-06.ejs");
    },
    course7: function (req, res) {
        res.render("course-07.ejs");
    },
    course8: function (req, res) {
        res.render("course-08.ejs");
    },
    course9: function (req, res) {
        res.render("course-09.ejs");
    },
    course10: function (req, res) {
        res.render("course-10.ejs");
    },
    course11: function (req, res) {
        res.render("course-11.ejs");
    },
    course12: function (req, res) {
        res.render("course-12.ejs");
    },
    course13: function (req, res) {
        res.render("course-13.ejs");
    },
    detailPage: function (req, res) {
        if(req.query.pageID!=null){
            console.log(req.query.pageID);
        Post.find({_id:req.query.pageID}).sort({createDate: -1}).exec(function (err, data) {
         //res.json(data);
            //var resultRelated;
            result = data;
            // Post.find({type: result[0].type}).limit(3).sort({createDate: -1}).exec(function (err, dataPageRelated) {
            //     if (!err && dataPageRelated) {
            //         resultRelated = dataPageRelated;
            //        // res.json(result,resultRelated);
            //        // callback5();
            //        res.json({result},{resultRelated});
            //     } else
            //         throw err;
            // })
            
           res.render("chi-tiet-bai-viet.ejs", { result });
        })
    }
    },
    addPost: function (req, res) {
        console.log(req.body);
        try {
            var n,strAfterProcess;
            if(req.body.embeddedLink != null ){
            n = req.body.embeddedLink.search("<iframe");
            if(n>=0){
                    strAfterProcess = "<iframe width=\"100%\" height=\"100%\" src=\""+ req.body.embeddedLink.split("\"")[5]+"\" frameborder=\"0\" allowfullscreen></iframe>";
                }
            if(n==-1){    
                strAfterProcess = "<img src=\""+req.body.embeddedLink+"\" alt=\"Smiley face\" height=\"100%\" width=\"100%\">"; 
            }               
            }
           
            var post = new Post({
                embeddedLink: strAfterProcess,
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
                    res.render("upNewPostResult.ejs");
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

            User.findOne({user_name: req.body.aName, password: req.body.aPass}).exec(function (err, data) {
                if(!data || err){
                    console.log("invalid user or password!");
                    // res.send(500,'showAlert');
                    // alert("failed");
                    //res.json({message: "login failed"});
                    res.render("loginFailed.ejs");
                }
                res.render("index.login.ejs");
                console.log("valid");

            })
            //  console.log(`req:${JSON.stringify(result)}`);
            // res.json(result);


    }

}


function paging(req,res,type,ejs) {
    var totalPage = 0;
    var pageOptions = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,

    }
    var totalPage ;
    Post.count({type:type}).exec(function (err,count) {
        if(!err){
            totalPage = Math.ceil(count/pageOptions.limit) ;
            console.log(totalPage)
            if(pageOptions.page>totalPage){
                res.render("loginFailed.1.ejs");
                return;
            }

            Post.find({type: type},null,{limit:+pageOptions.limit,skip:pageOptions.limit*(pageOptions.page-1)}).sort({
                createDate: -1
            }).exec(function (err,data) {
                if(!err){
                    var next = pageOptions.page+1>totalPage?pageOptions.page:pageOptions.page+1;
                    var prev = pageOptions.page-1>0?pageOptions.page-1:pageOptions.page;
                    var ret = {data:data,current:+pageOptions.page,next:next,prev:prev,totalPage:totalPage}
                    // res.json({result:ret});
                    res.render(ejs,{result:ret});
                }else {
                    console.log(err)
                    res.render("loginFailed.1.ejs");
                }

            })
        }
    })
}