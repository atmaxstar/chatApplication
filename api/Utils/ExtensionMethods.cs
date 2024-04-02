using System.Globalization;

namespace chatApp.Utils{
    public static class ExtensionMethods{
        public static string GetPersianFormat(this DateTime dt){
            var pc = new PersianCalendar();
            return $"{pc.GetYear(dt)}/{pc.GetMonth(dt)} {pc.GetHour(dt)}:{pc.GetMinute(dt)}:{pc.GetSecond(dt)}";
        }
    }
}