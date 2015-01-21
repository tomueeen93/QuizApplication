// 変数の定義
// 問題の配列
quiz_list = null;
correct_answer_id = "";
total_score = 0;
questions_length = 0;
current_question_num = 0;
hukidashi_selectable = false;
slide_counter = 5;
quiz_file_name = "data/quiz_data_complete2.txt";

// テスト用
QUESTIONS = 5;// 出題数

// メイン関数
$(document).ready(function() {
	// ここに読み込まれた時のの処理を記述します。
	// modalの設定変更
	modalSetting();
	// BootStrapのリセット命令
	fadeAnimation()
	// スライドの表示
	$('#slide'+slide_counter).css("display",'block');
	// 効果音のロード
	ion.sound({
		sounds : [
		           {name:"drum-japanese2"},
		           {name:"bell_ring"}, 
		           {name:"mens-ou1"}, 
		           {name:"water-drop1"},
		           {name:"button_tiny"},
		           {name:"water_droplet"},
		           {name:"shock3"},
		           {name:"clapping-hands1"},
		           /*BGM*/
		           {name:"mariorpg-kanasii-uta",preload: false,volume : 0.3},
		           {name:"passer-montanus-cry1",preload: false,volume : 0.6,loop:5}
		           ],
		volume : 0.5,
		path : "sounds/",
		preload : true
	});

	// 問題のロード
	$.get(quiz_file_name, function(data) {
		createArray(data);
		questions_length = quiz_list.length;
		shuffle(quiz_list);
		console.log(quiz_list);
		console.log(questions_length);
	});
});
// 各要素の初期化
function initElement() {
	$("#quiz-num > span").text("");
	$("#situation-text").text("");
	$("#question-text").text("");
	$("#ans1>.answer-text").text("");
	$("#ans2>.answer-text").text("");
	$("#ans3>.answer-text").text("");
	$("#ans4>.answer-text").text("");
	$("#ans1").css("display", "table");
	$("#ans2").css("display", "table");
	$("#ans3").css("display", "table");
	$("#ans4").css("display", "table");
	$('#response-text').text("");
	$('.response').css("display", "none");
	$("#score").text("");
	$('#correct-message').css("display", "none");
	$('#correct-answer-text').text("");
	$('.correct-answer').css("display", "none");
	$('#next-button').css("display", "none");

	for ( var i = 1; i <= 4; i++) {
		$("#ans" + (i)).removeClass('a-hukidashi-selected');
		$("#ans" + (i)).addClass('a-hukidashi');
	}
	$('#result-button').css("display", "none");
}
function setText(quiz_data) {
	// 問題番号の設定
	$("#quiz-num > span").text((current_question_num + 1));
	// シチュエーションの設定
	$("#situation-text").append(quiz_data[2]);
	// 問題文のセット
	$("#question-text").append(quiz_data[3]);
	// 選択肢1~４のセット
	$("#ans1>.answer-text").text(quiz_data[4]);
	$("#ans2>.answer-text").append(quiz_data[6]);
	$("#ans3>.answer-text").append(quiz_data[8]);
	$("#ans4>.answer-text").append(quiz_data[10]);
	var str = quiz_data[12];
	correct_answer_id = "ans" + Number(str);
}
function restart(){
	// 変数の初期化
	correct_answer_id = "";
	total_score = 0;
	questions_length = 0;
	current_question_num = 0;
	hukidashi_selectable = false;
	slide_counter = 5;
	// 要素の初期化
	initElement();
	// データをシャッフル
	shuffle(quiz_list);
	console.log(quiz_list);
	console.log(questions_length);
}

// 配列をランダムに入れ替えるメソッド
function shuffle(array) {
	array.sort(function() {
		return Math.random() - .5;
	});
}
function createArray(csvData) {
	var tempArray = csvData.split("\n");
	var csvArray = new Array();
	for ( var i = 0; i < tempArray.length; i++) {
		csvArray[i] = tempArray[i].split(",");
	}
	quiz_list = csvArray;
}
function modalSetting(){
	$("#div787").css("margin-left","0px");
	$("#div787").css("left","0px");
}
$(window).resize(function() {
	modalSetting();
});