from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import numpy

# X, y = load_iris(return_X_y=True)
# print(X[:2, :])
# print(y)
# clf = LogisticRegression(random_state=0, max_iter=1000).fit(X, y)
# clf = LogisticRegression(max_iter=10000000).fit(X, y)
# print(clf.predict(X[:2, :]))
# print(clf.predict_proba(X[:2, :]))
# print(clf.score(X, y))

# Python 3 server example

hostName = "localhost"
serverPort = 8081

class ml():
  def __init__(self):
    with open('../data/store/data.json') as f:
      self.data = json.load(f)
      self.arrays = self.data["arrays"]
    # Reshape your data either using array.reshape(-1, 1) if your data has a single feature or array.reshape(1, -1) if it contains a single sample.
    self.course_lrs = {}
    time = numpy.array(self.arrays["time"]).reshape(-1, 1)
    test = numpy.array([[700]])
    lr = LogisticRegression(max_iter=1000000).fit(time, self.arrays["passes"])
    # print(lr.predict(time[10, :].reshape(-1, 1)))
    print(test)
    print(lr.predict(test)[0])
  def get_time_array(self, course):
    if not course:
      return numpy.array(self.arrays["time"]).reshape(-1, 1)
    return numpy.array(self.arrays["courseData"][course]["time"]).reshape(-1, 1)
  def get_passes_array(self, course):
    if not course:
      return self.arrays["passes"]
    return self.arrays["courseData"][course]["passes"]
  def train_course_model(self, course):
    time = self.get_time_array(course)
    passes = self.get_passes_array(course)
    self.course_lrs[(course or "all")] = LogisticRegression(max_iter=1000000).fit(time, passes)
  def get_prediction(self, minutes, course):
    print("get prediction called")
    print((course or "all") in self.course_lrs)
    if ((course or "all") in self.course_lrs) == False:
      print("FALSE DID HAPPEN")
      self.train_course_model(course)
    return self.course_lrs[(course or "all")].predict(numpy.array([[minutes]]))[0]
  def get_data(self):
    return self.data


model = ml()
class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        # self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
        # self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
        # self.wfile.write(bytes("<body>", "utf-8"))
        # self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
        # self.wfile.write(bytes("</body></html>", "utf-8"))
        print(self.path)
        if self.path == '/':
          return self.wfile.write(bytes('{ "running": true }', "utf-8"))
        self.parsed = urlparse(self.path)
        if self.parsed.path == '/ml':
          query = parse_qs(self.parsed.query)
          if "course" in query:
            course = query["course"][0]
          else:
            course = None
          result = model.get_prediction(minutes=query["minutes"][0], course=course)
          print(result)
          return self.wfile.write(bytes(str(result), "utf-8"))

        # todo - parse path for course and student name and return prediction for it

if __name__ == "__main__":        
  webServer = HTTPServer((hostName, serverPort), MyServer)
  print("Server started http://%s:%s" % (hostName, serverPort))

  try:
      webServer.serve_forever()
  except KeyboardInterrupt:
      pass

  webServer.server_close()
  print("Server stopped.")