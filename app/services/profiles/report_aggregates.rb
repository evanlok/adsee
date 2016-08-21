module Profiles
  class ReportAggregates
    NUMBER_ATTRIBUTE_NAMES = %i(
      total matched name age gender photo location company interests linkedin facebook twitter pinterest male female
    ).freeze

    JSON_ATTRIBUTE_NAMES = %i(ages age_ranges states countries).freeze

    attr_accessor(*NUMBER_ATTRIBUTE_NAMES + JSON_ATTRIBUTE_NAMES)

    def initialize
      reset
    end

    def reset
      NUMBER_ATTRIBUTE_NAMES.each do |name|
        send("#{name}=", 0)
      end

      JSON_ATTRIBUTE_NAMES.each do |name|
        send("#{name}=", {})
      end
    end

    def [](name)
      send(name)
    end

    def []=(name, val)
      send("#{name}=", val)
    end

    def merge!(report_aggregates)
      NUMBER_ATTRIBUTE_NAMES.each do |name|
        send("#{name}=", send(name) + report_aggregates.send(name))
      end

      JSON_ATTRIBUTE_NAMES.each do |name|
        report_aggregates.send(name).each do |k, _v|
          if send(name)[k]
            send(name)[k] += report_aggregates.send(name)[k]
          else
            send(name)[k] = report_aggregates.send(name)[k]
          end
        end
      end
    end

    def as_json
      json = {}

      NUMBER_ATTRIBUTE_NAMES.each do |name|
        json[name] = send(name)
      end

      JSON_ATTRIBUTE_NAMES.each do |name|
        json[name] = send(name).deep_dup
      end

      json
    end
  end
end
