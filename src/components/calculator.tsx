'use client'

import React, { useState, useEffect } from 'react'
import { Calculator as CalcIcon, Delete, Equal } from 'lucide-react'

/**
 * 基础计算器组件
 * 提供数字输入、四则运算、结果显示等功能
 */
export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  /**
   * 处理数字输入
   * @param num - 输入的数字
   */
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  /**
   * 处理小数点输入
   */
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  /**
   * 清除计算器
   */
  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  /**
   * 执行计算操作
   * @param nextOperation - 下一个操作符
   */
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let result: number

      switch (operation) {
        case '+':
          result = currentValue + inputValue
          break
        case '-':
          result = currentValue - inputValue
          break
        case '×':
          result = currentValue * inputValue
          break
        case '÷':
          if (inputValue === 0) {
            setDisplay('Error')
            setPreviousValue(null)
            setOperation(null)
            setWaitingForOperand(true)
            return
          }
          result = currentValue / inputValue
          break
        default:
          return
      }

      // 格式化结果显示
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '')
      setDisplay(formattedResult)
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  /**
   * 计算最终结果
   */
  const calculate = () => {
    if (operation && previousValue !== null) {
      performOperation('=')
      setOperation(null)
      setPreviousValue(null)
      setWaitingForOperand(true)
    }
  }

  /**
   * 处理键盘输入
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event
      
      if (key >= '0' && key <= '9') {
        inputNumber(key)
      } else if (key === '.') {
        inputDecimal()
      } else if (key === '+') {
        performOperation('+')
      } else if (key === '-') {
        performOperation('-')
      } else if (key === '*') {
        performOperation('×')
      } else if (key === '/') {
        event.preventDefault()
        performOperation('÷')
      } else if (key === 'Enter' || key === '=') {
        calculate()
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, operation, previousValue, waitingForOperand])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <CalcIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Quick Calculator
        </h2>
      </div>
      
      <div className="max-w-sm mx-auto">
        {/* 显示屏 */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="text-right text-2xl font-mono text-gray-900 dark:text-white min-h-[2rem] overflow-hidden">
            {display}
          </div>
        </div>

        {/* 按钮网格 */}
        <div className="grid grid-cols-4 gap-3">
          {/* 第一行：清除、删除、除法 */}
          <button
            onClick={clear}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Delete className="h-4 w-4 mr-1" />
            Clear
          </button>
          <div></div>
          <button
            onClick={() => performOperation('÷')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            ÷
          </button>

          {/* 第二行：7、8、9、乘法 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            ×
          </button>

          {/* 第三行：4、5、6、减法 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            -
          </button>

          {/* 第四行：1、2、3、加法 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            +
          </button>

          {/* 第五行：0、小数点、等号 */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Equal className="h-4 w-4" />
          </button>
        </div>

        {/* 键盘提示 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tip: You can use your keyboard for input
          </p>
        </div>
      </div>
    </div>
  )
}