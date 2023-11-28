package usecase

import (
	"github.com/lucasmar236/MOF/domain"
	"time"
)

type ProfileUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewProfileUseCase() {}
