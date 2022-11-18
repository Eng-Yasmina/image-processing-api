import {DisplayProcessor, SpecReporter, StacktraceOption} from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;

export interface CustomReporterResult extends jasmine.CustomReporterResult {
    _jsr?: {
      formattedDuration?: string
    }
  }

class MyProcessor extends DisplayProcessor {
    public displaySuccessfulSpec(spec: CustomReporterResult, log: string): string {
      return this.theme.successful('OK ') + log
    }
  }

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [MyProcessor],
}));