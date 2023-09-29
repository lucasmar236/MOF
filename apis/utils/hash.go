package utils

import "math/rand"

var letterRunes = []rune("ABCDEF1234567890")

func RandomHash(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
