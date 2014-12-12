// 解答をクリックした時のイベントを登録

$(".a-hukidashi").click(function() {
	if(hukidashi_selectable){
		stopBGMs();
		ion.sound.play("button_tiny");
		hukidashi_selectable = false;
		$(this).addClass('a-hukidashi-selected');
		var id = this.id;
		console.log("selected : " + id);
		var selected_index = getIndex(id);
		var element_height=$('.answer').height();
		for ( var i = 1; i <= 4; i++) {
			var str = "ans" + (i);
			if (!(str == id)) {
				$("#ans" + (i)).hide(500);
//				$("#ans" + (i)).delay(150*i).animate({opacity:"toggle"},{duration:500,queue:true},function(){
//					$("#"+this.id).delay(20*i).css("display","none");
//				});
			}
		}
		// レスポンスの表示
		var response_index = (4 + (selected_index * 2) + 1);
		$('#response-text').text(quiz_list[current_question_num][response_index]);
		$('.response').delay(3200).fadeToggle("fast",function(){
			ion.sound.play("button_tiny");
		});
		// 答えのチェック
		if(answerCheck(selected_index)){
			// 正解
			console.log("correct answer");
			// トータルスコアに得点を加算
			total_score = (total_score +  parseFloat(quiz_list[current_question_num][1]));
			console.log("total score : "+ total_score);
			// 現在の得点を表示
			$("#score").text(quiz_list[current_question_num][1]);
			
			// 正解のメッセージを表示
			// $('#correct-message').css("display", "block");
			$('#correct-message').delay(6600).fadeToggle("slow",function(){
				ion.sound.play("clapping-hands1");
			});
		} else {
			// 不正解の場合
			console.log("incorrect answer");
			var answer_index = (4 + (getIndex(correct_answer_id)*2));
			$('#correct-answer-text').text(quiz_list[current_question_num][answer_index]);
			$('.correct-answer').delay(6600).fadeToggle("slow",function(){
				ion.sound.play("shock3", {
				    onEnded: function (name) {
				    	ion.sound.play("mariorpg-kanasii-uta");
				    }
				});
			});
		}
		console.log("correct answer is : "+ correct_answer_id);
		
		// クイズの終了判定を行なう
// Test用のコメントアウト
// if(current_question_num == questions_length-1){
		if(current_question_num == QUESTIONS-1){
			// 全問題の終了
			// Resultボタンの表示
// $('#result-button').css("display", "block");
			$('#result-button').delay(7500).fadeToggle(1000);;
		}else{
			// Nextボタンの表示
// $('#next-button').css("display", "block");
			$('#next-button').delay(7500).fadeToggle(1000);
			// 問題の終了、インデックスの更新
			current_question_num++;
		}
	}
});
$(".next-start").click(function() {
	stopBGMs();
	ion.sound.play("bell_ring", {
	    onEnded: function (name) {
	    	ion.sound.play("passer-montanus-cry1",{loop: 5});
	    }
	});
	console.log("current_question_num : "　+　current_question_num);
	if(current_question_num == questions_length-1){
		// 全クイズ終了
		alert("読み込んだ全てのクイズを出題しました。");
	}else{
		// 次の問題を作成する
		initElement();
		setText(quiz_list[current_question_num]);
		console.log(quiz_list[current_question_num]);
		hukidashi_selectable = true;
	}
});
$(".restart-button").click(function(){
	stopBGMs();
	console.log("restart");
	// メイン画面を終了させ、タイトル画面に戻る
	$('#container-main').fadeToggle(500,function(){
		restart();		
	});
	$("#lean_overlay").trigger("click");
	$('#container-slider').delay(500).fadeToggle(0);
	$('#slide5').delay(1000).fadeToggle(500);
	// タイトルアニメーションの再設定
	blinkMotor = setInterval("fadeAnimation()",3000);
});

$(".show-result").click(function() {
	stopBGMs();
	ion.sound.play("drum-japanese2", {
	    onEnded: function (name) {
	    	ion.sound.play("mens-ou1");
	    }
	});
	$('#total-score > span').text(total_score);
});

$("#container-slider").click(function(){
	console.log("clicked slide"+slide_counter);
	if(slide_counter<5){
		$("#slide"+slide_counter).fadeToggle(500);
		$("#slide"+(slide_counter+1)).delay(500).fadeToggle(500);
	}else{
		$("#slide"+slide_counter).fadeToggle(500,function(){
			$("#container-slider").css("display","none");
		});
		$("#container-main").delay(500).fadeToggle(500,function(){
			$('#modal-situation').trigger("click");
			clearInterval(blinkMotor);
		});
	}
	slide_counter++;
	
});
$(".a-hukidashi").hover(function() {
	if(hukidashi_selectable){
		ion.sound.play("water-drop1");		
	}
});
function answerCheck(sel_id) {
	var str = "ans"+(sel_id + 1);
	if(correct_answer_id==str){
		return true;
	}
	return false;
}
function getIndex(elment_id) {
	if (elment_id == "ans1") {
		return 0;
	} else if (elment_id == "ans2") {
		return 1;
	} else if (elment_id == "ans3") {
		return 2;
	} else if (elment_id == "ans4") {
		return 3;
	} else {
		console.log("selected index error");
	}
	return 0;
}
// modalの設定
$('a[rel*=leanModal]').leanModal({
	top : 80, // モーダルウィンドウの縦位置を指定
	overlay : 0.80, // 背面の透明度
	closeButton : ".modal_close" // 閉じるボタンのCSS classを指定
});
// BGMを止めるためのもの
function stopBGMs(){
	ion.sound.stop("mariorpg-kanasii-uta");
	ion.sound.stop("passer-montanus-cry1");
}
// タイトルのアニメーション設定
blinkMotor = setInterval("fadeAnimation()",3000);
function fadeAnimation() {
    $(".fade-animation").fadeToggle(500);
    $(".fade-animation").delay(1000).fadeToggle(500);
}
