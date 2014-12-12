using System.Web;
using System.Web.Optimization;

namespace QuizApplication
{
    public class BundleConfig
    {
        // バンドルの詳細については、http://go.microsoft.com/fwlink/?LinkId=301862  を参照してください
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // 開発と学習には、Modernizr の開発バージョンを使用します。次に、実稼働の準備が
            // できたら、http://modernizr.com にあるビルド ツールを使用して、必要なテストのみを選択します。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/reset.css",
                      "~/Content/bootstrap.css",
                      "~/Content/jquery.skippr.css",
                      "~/Content/style.css"));

            // my js setting
            bundles.Add(new ScriptBundle("~/bundles/myscripts").Include(
                      "~/Scripts/myscript/jquery.-2.1.1.min.js",
                      "~/Scripts/myscript/jquery.leanModal.min.js",
                      "~/Scripts/myscript/jquery.cookie.js",
                      "~/Scripts/myscript/jquery.skippr.js",
                      "~/Scripts/myscript/ion.sound.min.js",
                      "~/Scripts/myscript/main.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/below").Include(
                      "~/Scripts/myscript/even.jst",
                      "~/Scripts/myscript/bootstrap.min.js"
            ));

            // デバッグを行うには EnableOptimizations を false に設定します。詳細については、
            // http://go.microsoft.com/fwlink/?LinkId=301862 を参照してください
            BundleTable.EnableOptimizations = true;
        }
    }
}
