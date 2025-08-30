import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Target, Calendar } from 'lucide-react'
import './App.css'
import './index.css'

function FitnessTracker() {
    const[currentWeight,setCurrentWeight] = useState("")
    const[targetWeight,setTargetWeight] = useState("")
    const[duration,setDuration] = useState("")
    const[result,setResult] = useState("")

    //lets add the functanility part so mai chahta hu yeh humse input le ki hmara current weight kitna hai 
    //aur humko kitne weight tkk reduce krna hai fir humme approximated calories de de kaafi simple sa kaam hai waise yeh
    //ab agar input emty hue toh jo result hoga uspe pass kr denge ki enter valid credentials
    //since 1kg=7700Kcal hoti hai iska mtlb ki hume weight ka diff chaiye hoga
    //calories ko calculate krne ke liye function likheng

    const calculateCalories = () => {
        const cw = parseFloat(currentWeight);//current weighjt ko decimal ke form mai convert kr diya
        const tw = parseFloat(targetWeight);//similarly target weight ko bhi
        const d = parseInt(duration);

        //agar inme se ek bhi nhi diya gya toh result hoga ki shanti se credentials enter kare

        if(!cw||!tw||!d){
            setResult("⚠️ Please enter valid numbers");
            return;
        }

        const weightDifference = cw - tw;
        const caloriesToBurn = weightDifference * 7700;//1kg loose ya add krne ke liye humme 7700kcal calories chaiye 
        const dailyCalories = caloriesToBurn / d;

        if (weightDifference === 0) {
            setResult("✅ You are already at your target weight!");
        } else if (weightDifference < 0) {
            setResult(`💪 To gain ${Math.abs(weightDifference).toFixed(
                1
            )} kg in ${d} days, you need a daily calorie surplus of about ${Math.abs(
                dailyCalories
            ).toFixed(0)} kcal.`);
        } else if (weightDifference > 0) {
            setResult(`🔥 To lose ${weightDifference.toFixed(
                1
            )} kg in ${d} days, you need a daily calorie deficit of about ${dailyCalories.toFixed(
                0
            )} kcal.`);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-700 via-emerald-500 to-gray-900 px-4 sm:px-6">

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-8 space-y-6"
            >
                {/* This is a special motion-enabled div from Framer Motion.
                It allows you to animate the div by defining initial, animate, and transition states. 
                2. initial={{ opacity: 0, scale: 0.9, y: 30 }}

                This is the starting state of the component when it first renders:

                - opacity: 0 → completely invisible.
                - scale: 0.9 → slightly smaller (90% of its size).
                - y: 30 → shifted 30px down.

                So, the card starts small, hidden, and slightly pushed down.

                3. animate={{ opacity: 1, scale: 1, y: 0 }}

                This is the final state after the animation:

                - opacity: 1 → fully visible.
                - scale: 1 → normal size.
                - y: 0 → back to its correct position.

                So, the card fades in, grows to normal size, and moves up into place.

                4. transition={{ duration: 0.6, ease: "easeOut" }}

                 Controls how the animation plays:

                - duration: 0.6 → takes 0.6 seconds.
                - ease: "easeOut" → starts fast and slows down at the end (smooth finish).






                
                
                */}
                <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-md">
                    Fitness Tracker
                </h2>
                <p className="text-center text-gray-200 text-sm">
                    Track your calorie needs for weight goals 🚀
                </p>

                {/* Inputs */}
                <div className="space-y-4">
                    <div className="flex items-center bg-white/10 rounded-xl p-3 focus-within:ring-2 focus-within:ring-pink-400">
                        <Dumbbell className="text-white mr-3" />
                        <input
                            type="number"
                            placeholder="Current Weight (kg)"
                            value={currentWeight}
                            onChange={(e) => setCurrentWeight(e.target.value)}
                            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
                        />
                    </div>

                    <div className="flex items-center bg-white/10 rounded-xl p-3 focus-within:ring-2 focus-within:ring-pink-400">
                        <Target className="text-white mr-3" />
                        <input
                            type="number"
                            placeholder="Target Weight (kg)"
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value)}
                            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
                        />
                    </div>

                    <div className="flex items-center bg-white/10 rounded-xl p-3 focus-within:ring-2 focus-within:ring-pink-400">
                        <Calendar className="text-white mr-3" />
                        <input
                            type="number"
                            placeholder="Duration (days)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
                        />
                    </div>
                </div>

                {/* Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={calculateCalories}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:shadow-xl hover:from-red-500 hover:to-pink-500 transition"
                >
                    Calculate
                </motion.button>

                {/* Result */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-white/20 via-pink-200/20 to-white/20 text-center text-white font-medium shadow-inner animate-pulse"
                    >
                        {result}
                    </motion.div>
                )}
            </motion.div>
            
        </div>
    );
}

export default FitnessTracker;

//Rest mai aur kya hi likhu basic html likhi hai aur rest maine lucid se dumbell , target and calander liya tha ussi toh uski styling ki hai tailwind se 
//main toh functionality pr focus kiya filhaal jyada UI pr nhi kiya
