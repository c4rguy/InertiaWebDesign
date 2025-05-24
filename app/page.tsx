"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication - in a real app, you'd call an API
    setTimeout(() => {
      // For demo purposes, any login works
      if (username && password) {
        // Store auth state
        localStorage.setItem("intertia-auth", JSON.stringify({ username }))
        router.push("/editor")
      } else {
        setError("Please enter both username and password")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-4">
            <div className="relative w-16 h-16 mx-auto">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl"
              >
                I
              </motion.div>
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Intertia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-zinc-400"
          >
            Advanced Code Environment
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Welcome back</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-zinc-300">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-900/50 border-zinc-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-900/50 border-zinc-700 text-white pr-10 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Authenticating..."
                ) : (
                  <>
                    Sign in <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
          <div className="px-6 py-4 bg-zinc-800/80 border-t border-zinc-700/50">
            <p className="text-zinc-400 text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Create one
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
