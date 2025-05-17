
interface PrayerTimesResponse {
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
      Firstthird: string;
      Lastthird: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: { [key: string]: number };
    };
  }[];
}

export interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

const arabicNames: Record<string, string> = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
  Sunrise: "الشروق",
};

export const fetchPrayerTimes = async (
  date: Date = new Date(),
  latitude = 21.3891,
  longitude = 39.8579,
  method = 4 // Default to Umm al-Qura University, Makkah method
): Promise<{
  prayerTimes: PrayerTime[];
  date: string;
  nextPrayer: string;
}> => {
  try {
    // Format the date as DD-MM-YYYY
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    
    // Make API request to Aladhan
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }
    
    const data = await response.json();
    
    // Extract the relevant prayer times
    const { timings } = data.data;
    const readableDate = data.data.date.readable;
    
    const prayerTimesToDisplay: PrayerTime[] = [
      { name: "Fajr", time: formatTime(timings.Fajr), arabicName: arabicNames.Fajr },
      { name: "Sunrise", time: formatTime(timings.Sunrise), arabicName: arabicNames.Sunrise },
      { name: "Dhuhr", time: formatTime(timings.Dhuhr), arabicName: arabicNames.Dhuhr },
      { name: "Asr", time: formatTime(timings.Asr), arabicName: arabicNames.Asr },
      { name: "Maghrib", time: formatTime(timings.Maghrib), arabicName: arabicNames.Maghrib },
      { name: "Isha", time: formatTime(timings.Isha), arabicName: arabicNames.Isha },
    ];
    
    // Determine next prayer
    const nextPrayer = getNextPrayer(prayerTimesToDisplay);
    
    return {
      prayerTimes: prayerTimesToDisplay,
      date: readableDate,
      nextPrayer,
    };
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    
    // Return fallback data if there's an error
    return {
      prayerTimes: [
        { name: "Fajr", time: "5:42 AM", arabicName: "الفجر" },
        { name: "Sunrise", time: "7:03 AM", arabicName: "الشروق" },
        { name: "Dhuhr", time: "12:15 PM", arabicName: "الظهر" },
        { name: "Asr", time: "3:45 PM", arabicName: "العصر" },
        { name: "Maghrib", time: "6:22 PM", arabicName: "المغرب" },
        { name: "Isha", time: "7:45 PM", arabicName: "العشاء" },
      ],
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      nextPrayer: "Asr",
    };
  }
};

// Format time from 24-hour to 12-hour format
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Get next prayer based on current time
const getNextPrayer = (prayerTimes: PrayerTime[]): string => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  for (const prayer of prayerTimes) {
    const [hoursStr, rest] = prayer.time.split(":");
    const [minutesStr, ampm] = rest.split(" ");
    
    let hours = parseInt(hoursStr);
    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }
    
    const minutes = parseInt(minutesStr);
    const prayerTimeInMinutes = hours * 60 + minutes;
    
    if (prayerTimeInMinutes > currentTime) {
      return prayer.name;
    }
  }
  
  // If all prayers for today have passed, return the first prayer for tomorrow
  return prayerTimes[0].name;
};

// Function to fetch prayer times for an entire week
export const fetchWeeklyPrayerTimes = async (
  latitude = 21.3891,
  longitude = 39.8579,
  method = 4
): Promise<Array<{
  day: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}>> => {
  try {
    const weeklyData = [];
    const currentDate = new Date();
    
    // Fetch prayer times for 7 days (current day + next 6 days)
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      
      const { prayerTimes } = await fetchPrayerTimes(date, latitude, longitude, method);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      weeklyData.push({
        day: dayName,
        fajr: prayerTimes[0].time,
        sunrise: prayerTimes[1].time,
        dhuhr: prayerTimes[2].time,
        asr: prayerTimes[3].time,
        maghrib: prayerTimes[4].time,
        isha: prayerTimes[5].time,
      });
    }
    
    return weeklyData;
  } catch (error) {
    console.error("Error fetching weekly prayer times:", error);
    
    // Return fallback data for weekly times
    return [
      { day: 'Monday', fajr: '5:40 AM', sunrise: '7:01 AM', dhuhr: '12:15 PM', asr: '3:45 PM', maghrib: '6:22 PM', isha: '7:45 PM' },
      { day: 'Tuesday', fajr: '5:41 AM', sunrise: '7:02 AM', dhuhr: '12:15 PM', asr: '3:45 PM', maghrib: '6:23 PM', isha: '7:46 PM' },
      { day: 'Wednesday', fajr: '5:42 AM', sunrise: '7:03 AM', dhuhr: '12:15 PM', asr: '3:46 PM', maghrib: '6:24 PM', isha: '7:47 PM' },
      { day: 'Thursday', fajr: '5:43 AM', sunrise: '7:04 AM', dhuhr: '12:16 PM', asr: '3:46 PM', maghrib: '6:25 PM', isha: '7:48 PM' },
      { day: 'Friday', fajr: '5:44 AM', sunrise: '7:05 AM', dhuhr: '12:16 PM', asr: '3:47 PM', maghrib: '6:26 PM', isha: '7:49 PM' },
      { day: 'Saturday', fajr: '5:45 AM', sunrise: '7:06 AM', dhuhr: '12:16 PM', asr: '3:47 PM', maghrib: '6:27 PM', isha: '7:50 PM' },
      { day: 'Sunday', fajr: '5:46 AM', sunrise: '7:07 AM', dhuhr: '12:17 PM', asr: '3:48 PM', maghrib: '6:28 PM', isha: '7:51 PM' },
    ];
  }
};
