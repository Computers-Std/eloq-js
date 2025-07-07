#lang htdp/isl+

(define (array-list arr)
  (cond
    [(empty? (rest arr)) (list (first arr) '())]
    [else (list (first arr)
                (array-list (rest arr)))]))

;; (array-list '(3 2 8 9 6 9))

(define (nth l n)
  (cond
    [(= n 0) (first l)]
    [else (nth (rest l) (sub1 n))]))

(check-expect (nth '(3 2 8 9 6 9) 0) 3)
(check-expect (nth '(3 2 8 9 6 9) 3) 9)
