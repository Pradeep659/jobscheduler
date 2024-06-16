package scheduler

import (
    "sort"
    "time"

    "job_scheduler/models"
    "job_scheduler/helpers"
)

func ShortestJobFirst() {
    sort.Slice(models.Jobs, func(i, j int) bool {
        return models.Jobs[i].Duration < models.Jobs[j].Duration
    })

    for i := range models.Jobs {
        if models.Jobs[i].Status == "Pending" {
            models.Jobs[i].Status = "Running"
            helpers.BroadcastJobUpdate(*models.Jobs[i])
            time.Sleep(models.Jobs[i].Duration)
            models.Jobs[i].Status = "Completed"
            helpers.BroadcastJobUpdate(*models.Jobs[i])
        }
    }
}
