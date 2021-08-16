const faker = require('faker')
const { v4: uuidv4 } = require('uuid')

const getCourseName = () => `${faker.company.bsAdjective().toLocaleUpperCase()} ${faker.name.jobArea().toLocaleUpperCase()}`

const getName = () => ({ firstName: faker.name.firstName(), lastName: faker.name.lastName() })

const getRandomNumber = (min, max) => {
  return (Math.random() * (max - min) + min)
}
const getMinutes = (min, max) => {
  return getRandomNumber(min, max) | 0
}

const getNumberOfStudents = (min, max = 100) => {
  if (!min) min = (max - (max * 0.2)) | 0
  return getRandomNumber(min, max) | 0
}

const getMinutesByResult = success => {
  // give overlap for realism - success vs failure result
  return success ? getMinutes(600, 1000) : getMinutes(0, 700)
}

const getScore = (min, max) => {
  return getRandomNumber(min, max)
}

const getResult = (successRate = 0.5, passThreshold = 60) => {
  const pass = Math.random() > successRate
  const score = pass ? getScore(passThreshold, 100) : getScore(0, passThreshold)
  return { pass, score }
}

const getMinutesAndResult = (successRate = 0.5) => {
  const result = getResult(successRate)
  const minutes = getMinutesByResult(result.pass)
  return { ...result, minutes }
}

// if you ask for too many courses this will cause high cpu usage due to lack of combos
const getCourseList = (numberOfCourses = 100) => {
  const courses = []
  while (courses.length < numberOfCourses) {
    const course = getCourseName()
    if (courses.indexOf(course) === -1) courses.push(course)
  }
  return courses
}

const buildDatum = (successRate = 0.5) => {
  return { ...getName(), uid: uuidv4(), ...getMinutesAndResult(successRate) }
}

const buildData = (successRate, maxStudentsPerCourse, numberOfCourses, minStudentsPerCourse) => {
  const courses = getCourseList(numberOfCourses)
  const data = courses.reduce((acc, course) => {
    const students = new Array(getNumberOfStudents(minStudentsPerCourse, maxStudentsPerCourse)).fill(0).map(() => {
      return buildDatum(successRate)
    })
    return { ...acc, [course]: students }
  }, {})
  return data
}

const arraysObject = {
  uids: [],
  firstNames: [],
  lastNames: [],
  scores: [],
  time: [],
  passes: [],
  courses: []
}
const dataAtIndex = (arrays, index) => {
  return Object.keys(arrays).reduce((acc, key) => {
    return { ...acc, [key]: arrays[key][index] }
  }, {})
}
const formatData = courses => {
  const arrays = Object.keys(courses).flatMap(key => courses[key].map(item => ({ ...item, course: key })))
    .reduce(({ courses, uids, firstNames, lastNames, scores, passes, time }, { firstName, lastName, uid, pass, score, minutes, course }) => {
      return { uids: [...uids, uid], firstNames: [...firstNames, firstName], lastNames: [...lastNames, lastName], scores: [...scores, score], passes: [...passes, pass], time: [...time, minutes], courses: [...courses, course] }
    }, Object.keys(arraysObject).reduce((acc, key) => ({ ...acc, [key]: [] }), []))
  arrays.courseData = Object.keys(courses).reduce((acc, key) => {
    const course = courses[key]
    return {
      ...acc,
      [key]: course.reduce((acc, val) => {
        return { time: [...acc.time, val.minutes], passes: [...acc.passes, val.pass] }
      }, { time: [], passes: [] })
    }
  }, {})
  const debug = Object.keys(courses).flatMap(key => {
    return courses[key]
  })
  const classified = debug.reduce((acc, { pass, minutes, score }) => {
    const prefix = pass ? 'passed' : 'failed'
    return { ...acc, [`${prefix}Scores`]: [...acc[`${prefix}Scores`], score], [`${prefix}Minutes`]: [...acc[`${prefix}Minutes`], minutes] }
  }, { passedScores: [], failedScores: [], passedMinutes: [], failedMinutes: [] })
  return { courses, arrays, classified }
}

const buildAndFormatData = (...args) => {
  const data = buildData(...args)
  const formattedData = formatData(data)
  return formattedData
}

module.exports = {
  getCourseName,
  getMinutes,
  getMinutesByResult,
  getResult,
  getMinutesAndResult,
  getCourseList,
  buildDatum,
  buildData,
  buildAndFormatData,
  dataAtIndex
}
