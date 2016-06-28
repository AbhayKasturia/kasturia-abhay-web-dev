/**
 * Created by Abhay on 6/21/2016.
 */

module.exports = function(app , models) {

    var questionModel = models.projectQuestionModel;

    var answerModel = models.projectAnswerModel;

    app.get("/api/project/findAnswerByQuestion/:qid", findAnswerByQuestion);
    app.get("/api/uncheckedanswers",findAllUncheckedAnswers);
    app.post("/api/project/updateanswer",updateAnswer);
    app.delete("/api/project/answer/:qid",deleteAnswer);
    app.get("/api/project/answer/user/:uid",searchAnswerByUserID);
    
    function searchAnswerByUserID(req , res){
        var uid = req.params.uid;

        answerModel
            .searchAnswerByUserID(uid)
            .then(
                function(answers){
                    res.json(answers);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteAnswer(req, res) {
        var id = req.params.aid;

        answerModel
            .deleteAnswer(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateAnswer(req,res){
        var newanswer = req.body;

        answerModel
            .updateAnswer(newanswer._id , newanswer)
            .then(
                function(answer){
                    if(answer){
                        res.json(answer);
                    }
                    else
                        res.sendStatus(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllUncheckedAnswers(req,res){
        answerModel
            .findAllUncheckedAnswers()
            .then(
                function(answers){
                    if(answers){
                        res.json(answers);
                    }
                    else
                        res.statusCode(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findMongoQID(qid){

    }

    function findAnswerByQuestion(req,res){
        var qid = req.params.qid;

        var mongo_qid="";

        questionModel
            .findQuestionByStackID(qid)
            .then(
                function(question){
                    if(question){
                        mongo_qid=question._id;
                        answerModel
                            .findAnswerByQuestionID(mongo_qid)
                            .then(
                                function(answers){
                                    res.json(answers);
                                },
                                function(err){
                                    res.json("0");
                                }
                            );
                    }
                    else{
                        questionModel
                            .findQuestionByID(qid)
                            .then(
                                function(question){
                                    if(question){
                                        mongo_qid=question._id;

                                        answerModel
                                            .findAnswerByQuestionID(mongo_qid)
                                            .then(
                                                function(answers){
                                                    res.json(answers);
                                                },
                                                function(err){
                                                    res.json("0");
                                                }
                                            );
                                    }
                                }
                            );
                    }
                },
                function(err){
                    questionModel
                        .findQuestionByID(qid)
                        .then(
                            function(question){
                                if(question){
                                    mongo_qid=question.id;
                                }
                                answerModel
                                    .findAnswerByQuestionID(mongo_qid)
                                    .then(
                                        function(answers){
                                            res.json(answers);
                                        },
                                        function(err){
                                            res.json("0");
                                        }
                                    );
                            }
                        );
                },function(err){
                    res.json("0");
                }
            );
    }
};