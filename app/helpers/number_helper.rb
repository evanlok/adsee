module NumberHelper
  def number_to_duration(total_seconds, prefix_empty_durations = false)
    seconds = total_seconds % 60
    minutes = (total_seconds / 60) % 60
    hours = total_seconds / (60 * 60)

    if prefix_empty_durations
      format('%02d:%02d:%02d', hours, minutes, seconds)
    else
      numbers = [hours, minutes, seconds].reject(&:zero?)
      format(numbers.map { '%02d' }.join(':'), *numbers)
    end
  end
end
