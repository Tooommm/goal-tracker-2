import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GoalTrackerWidget from './GoalTrackerWidget'

describe('<GoalTrackerWidget />', () => {
  const goal = {
    id: '0123456789abcdef01234567',
    name: 'My goal',
    target: 42,
    units: 'wombats',
  }

  describe('when not completed', () => {
    for (const progress of [0, 1, 21, 41]) {
      it(`should render appropriately at progress ${progress}`, () => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)

        expect(screen.getByRole('heading')).toHaveTextContent(goal.name)

        expect(screen.getByRole('progressbar')).toHaveAttribute(
          'aria-valuenow',
          String(Math.round((progress * 100) / goal.target))
        )

        expect(
          screen.getByText(`${progress} ${goal.units} sur ${goal.target}`)
        ).toBeInTheDocument()

        expect(screen.getByTestId('in-progress')).toBeInTheDocument()
      })
    }

    it('should trigger its onProgress on click', () => {
      const progress = 21

      const onProgress = jest.fn()
      render(
        <GoalTrackerWidget
          goal={goal}
          onProgress={onProgress}
          progress={progress}
        />
      )

      userEvent.click(screen.getByRole('button'))
      expect(onProgress).toHaveBeenCalledTimes(1)
      expect(onProgress).toHaveBeenCalledWith(goal)
    })

    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={21} />
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('when completed (or exceeded)', () => {
    for (const progress of [goal.target, goal.target + 1, goal.target + 10]) {
      it(`should render appropriately at progress ${progress}`, () => {
        render(<GoalTrackerWidget goal={goal} progress={progress} />)

        expect(screen.queryByTestId('in-progress')).not.toBeInTheDocument()
        expect(screen.getByTestId('completed')).toBeInTheDocument()
      })
    }

    it('should otherwise match the expected snapshot', () => {
      const { container } = render(
        <GoalTrackerWidget goal={goal} progress={42} />
      )

      expect(container).toMatchSnapshot()
    })
  })
})
