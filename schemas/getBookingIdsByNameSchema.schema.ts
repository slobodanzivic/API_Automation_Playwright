export const getBookingIdsByNameSchema = { "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "bookingid": {
        "type": "number"
      }
    },
    "required": [
      "bookingid"
    ]
  }
}
